use serde::{Deserialize, Serialize};

/// Manifesto de extensión — define permisos y límites
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExtensionManifest {
    pub name: String,
    pub version: String,
    pub runtime: Runtime,
    pub permissions: Vec<String>,
    pub limits: ResourceLimits,
    #[serde(default)]
    pub signature: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Runtime {
    Wasm,
}

/// Límites de recursos para la ejecución sandboxed
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ResourceLimits {
    /// CPU time en milisegundos
    pub cpu_ms: u64,
    /// Memoria máxima en megabytes
    pub memory_mb: u64,
    /// Wall clock time máximo en milisegundos
    pub walltime_ms: u64,
    /// Acceso a red
    #[serde(default = "default_network")]
    pub network: NetworkAccess,
}

fn default_network() -> NetworkAccess {
    NetworkAccess::None
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum NetworkAccess {
    None,
    Outbound,
    Full,
}

impl Default for ResourceLimits {
    fn default() -> Self {
        Self {
            cpu_ms: 50,
            memory_mb: 32,
            walltime_ms: 200,
            network: NetworkAccess::None,
        }
    }
}
