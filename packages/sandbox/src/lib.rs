pub mod capabilities;
pub mod executor;
pub mod manifest;

pub use executor::execute_extension;
pub use executor::ExecutionResult;
pub use manifest::ExtensionManifest;
pub use manifest::NetworkAccess;
pub use manifest::ResourceLimits;
pub use manifest::Runtime;

/// Valida que un manifiesto de extensión sea válido antes de ejecutar
pub fn validate_manifest(manifest: &ExtensionManifest) -> Result<(), String> {
    if manifest.name.is_empty() {
        return Err("Extension name is required".to_string());
    }
    if manifest.permissions.is_empty() {
        return Err("At least one permission must be declared".to_string());
    }
    if manifest.limits.cpu_ms == 0 {
        return Err("CPU limit must be greater than 0".to_string());
    }
    if manifest.limits.memory_mb == 0 {
        return Err("Memory limit must be greater than 0".to_string());
    }
    Ok(())
}
