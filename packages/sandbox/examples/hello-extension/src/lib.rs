/// Sample WASM extension — returns a simple result from `run()`
/// Compile with: cargo build --target wasm32-wasi --release

#[no_mangle]
pub extern "C" fn run() -> i32 {
    // In a real extension, this would call host functions
    // like fabrika.catalog_read() via WASM imports
    42
}

/// WASI entry point for extensions
#[no_mangle]
pub extern "C" fn _start() {
    // Minimal extension that just returns
}
