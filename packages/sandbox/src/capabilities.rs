use anyhow::Result;
use wasmtime::{Caller, Linker, StoreLimits};

/// Registra solo las capabilities autorizadas en el manifest como funciones host
pub fn register_capabilities(linker: &mut Linker<StoreLimits>, permissions: &[String]) -> Result<()> {
    for perm in permissions {
        match perm.as_str() {
            "catalog.read" => {
                linker.func_wrap("fabrika", "catalog_read", catalog_read)?;
            }
            "cart.read" => {
                linker.func_wrap("fabrika", "cart_read", cart_read)?;
            }
            "cart.write" => {
                linker.func_wrap("fabrika", "cart_write", cart_write)?;
            }
            "content.read" => {
                linker.func_wrap("fabrika", "content_read", content_read)?;
            }
            "media.read" => {
                linker.func_wrap("fabrika", "media_read", media_read)?;
            }
            _ => {
                // Capability desconocida — no se registra
                eprintln!("Warning: unknown capability '{}' — not registered", perm);
            }
        }
    }
    Ok(())
}

// ── Host functions — stubs que en producción llaman a la capa de capabilities ──

fn catalog_read(mut caller: Caller<'_, StoreLimits>, query_ptr: i32, query_len: i32) -> i32 {
    let _mem = caller.get_export("memory");
    // Stub: devuelve JSON mock
    // En producción, llama al Core API con el tenant/scope actual
    let _ = (query_ptr, query_len, caller);
    0 // success, data en memoria compartida
}

fn cart_read(caller: Caller<'_, StoreLimits>) -> i32 {
    let _ = caller;
    0
}

fn cart_write(caller: Caller<'_, StoreLimits>, product_id_ptr: i32, product_id_len: i32, quantity: i32) -> i32 {
    // En producción, valida que el usuario tiene scope para escribir en SU carrito
    let _ = (caller, product_id_ptr, product_id_len, quantity);
    0
}

fn content_read(caller: Caller<'_, StoreLimits>, query_ptr: i32, query_len: i32) -> i32 {
    let _ = (caller, query_ptr, query_len);
    0
}

fn media_read(caller: Caller<'_, StoreLimits>) -> i32 {
    let _ = caller;
    0
}
