"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupConnection = void 0;
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
function setupConnection() {
    const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
    // Create a simple text document manager.
    const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
    let hasConfigurationCapability = false;
    let hasWorkspaceFolderCapability = false;
    let hasDiagnosticRelatedInformationCapability = false;
    connection.onInitialize((params) => {
        const capabilities = params.capabilities;
        // Does the client support the `workspace/configuration` request?
        // If not, we fall back using global settings.
        hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
        hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
        hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument &&
            capabilities.textDocument.publishDiagnostics &&
            capabilities.textDocument.publishDiagnostics.relatedInformation);
        const result = {
            capabilities: {
                textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
                // Tell the client that this server supports code completion.
                completionProvider: {
                    resolveProvider: true
                }
            }
        };
        if (hasWorkspaceFolderCapability) {
            result.capabilities.workspace = {
                workspaceFolders: {
                    supported: true
                }
            };
        }
        return result;
    });
    connection.onInitialized(() => {
        if (hasConfigurationCapability) {
            // Register for all configuration changes.
            connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
        }
        if (hasWorkspaceFolderCapability) {
            connection.workspace.onDidChangeWorkspaceFolders(_event => {
                connection.console.log('Workspace folder change event received.');
            });
        }
    });
    return connection;
}
exports.setupConnection = setupConnection;
//# sourceMappingURL=init.js.map