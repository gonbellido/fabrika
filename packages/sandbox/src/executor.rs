use anyhow::{Context, Result};
use wasmtime::{Config, Engine, Instance, Linker, Module, Store, StoreLimits};
use wasmtime::StoreLimitsBuilder;

use crate::capabilities as host;
use crate::manifest::ExtensionManifest;

/// Resultado de ejecución
#[derive(Debug)]
pub struct ExecutionResult {
    pub success: bool,
    pub output: Option<String>,
    pub error: Option<String>,
    pub cpu_used_ms: u64,
    pub memory_used_bytes: u64,
}

/// Ejecuta una extensión WASM en sandbox
pub fn execute_extension(
    wasm_bytes: &[u8],
    manifest: &ExtensionManifest,
) -> Result<ExecutionResult> {
    // Configurar engine con límites
    let mut config = Config::default();

    // Límites de recursos via StoreLimits
    let store_limits = StoreLimitsBuilder::new()
        .memory_size(megabytes_to_bytes(manifest.limits.memory_mb))
        .instances(1)
        .tables(1)
        .memories(1)
        .build();

    config.epoch_interruption(true);
    config.consume_fuel(true);

    let engine = Engine::new(&config)?;

    // Compilar módulo
    let module = Module::new(&engine, wasm_bytes)
        .context("Failed to compile WASM module")?;

    // Crear linker con solo las capabilities autorizadas
    let mut linker = Linker::new(&engine);
    host::register_capabilities(&mut linker, &manifest.permissions)?;

    // Crear store con límites
    let mut store = Store::new(&engine, store_limits);
    store.set_fuel(manifest.limits.cpu_ms)
        .context("Failed to set fuel limit")?;

    // Instanciar
    let instance = linker.instantiate(&mut store, &module)
        .context("Failed to instantiate WASM module")?;

    // Ejecutar entry point
    let result = run_entry_point(&mut store, &instance);

    match result {
        Ok(output) => Ok(ExecutionResult {
            success: true,
            output: Some(output),
            error: None,
            cpu_used_ms: manifest.limits.cpu_ms.saturating_sub(store.get_fuel().unwrap_or(0)),
            memory_used_bytes: 0, // WASM memory tracking
        }),
        Err(e) => Ok(ExecutionResult {
            success: false,
            output: None,
            error: Some(format!("{:#}", e)),
            cpu_used_ms: 0,
            memory_used_bytes: 0,
        }),
    }
}

fn run_entry_point(store: &mut Store<StoreLimits>, instance: &Instance) -> Result<String> {
    // Try calling `_start` (WASI-style) or `run` (custom)
    if let Ok(func) = instance.get_typed_func::<(), ()>(&mut *store, "_start") {
        func.call(&mut *store, ())?;
        return Ok("completed".to_string());
    }

    if let Ok(func) = instance.get_typed_func::<(), i32>(&mut *store, "run") {
        let ret = func.call(&mut *store, ())?;
        return Ok(format!("return_code: {}", ret));
    }

    anyhow::bail!("No entry point found: expected `_start` or `run` function")
}

fn megabytes_to_bytes(mb: u64) -> usize {
    (mb * 1024 * 1024) as usize
}
