"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const types_1 = require("./include/types");
const tokens_1 = require("./include/tokens");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
const ttPrefix = 'html-chunk-loader: ';
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
let globalSettings = types_1.defaultSettings;
// Cache the settings of all open documents to be less thicc ram
const documentSettings = new Map();
connection.onDidChangeConfiguration(change => {
    if (hasConfigurationCapability) {
        // clear cached settings
        documentSettings.clear();
    }
    else {
        globalSettings = ((change.settings.languageServerExample || types_1.defaultSettings));
    }
    // Revalidate all open text documents
    documents.all().forEach(validateTextDocument);
});
// takes the context document in from the uri argument and gets the settings interface from above
function getDocumentSettings(resource) {
    if (!hasConfigurationCapability) {
        return Promise.resolve(globalSettings);
    }
    let result = documentSettings.get(resource);
    if (!result) {
        result = connection.workspace.getConfiguration({
            scopeUri: resource,
            section: 'languageServerExample'
        });
        documentSettings.set(resource, result);
    }
    return result;
}
// close when done
documents.onDidClose(e => documentSettings.delete(e.document.uri));
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => validateTextDocument(change.document));
async function validateTextDocument(textDocument) {
    // In this simple example we get the settings for every validate run.
    const settings = await getDocumentSettings(textDocument.uri);
    let problems = 0;
    // The validator creates diagnostics for all uppercase words length 2 and more
    const text = textDocument.getText();
    // iterate over tokens in tokens and set the meta related info based on constructed types from lib itself
    const diagnostics = [];
    for (const token of tokens_1.EXT_TOKEN_MAP) {
        const pattern = token.signature;
        const match = pattern.exec(text);
        if (match && match.length > 0 && problems < settings.maxNumberOfProblems) {
            problems++;
            const diagnostic = {
                severity: node_1.DiagnosticSeverity.Information,
                range: {
                    start: textDocument.positionAt(match.index),
                    end: textDocument.positionAt(match.index + match[0].length)
                },
                message: token.diagnosticName,
                source: `${token.signature}`
            };
            if (hasDiagnosticRelatedInformationCapability) {
                diagnostic.relatedInformation = [
                    {
                        location: {
                            uri: textDocument.uri,
                            range: Object.assign({}, diagnostic.range)
                        },
                        message: token.diagnosticMsg
                    },
                    {
                        location: {
                            uri: textDocument.uri,
                            range: Object.assign({}, diagnostic.range)
                        },
                        message: token.detailMsg
                    }
                ];
            }
            diagnostics.push(diagnostic);
        }
    }
    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
// This handler provides the initial list of the completion items.
connection.onCompletion((_textDocumentPosition) => {
    // The pass parameter contains the position of the text document in
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items.
    return [
        {
            label: '<!--@partial=-->',
            kind: node_1.CompletionItemKind.Snippet,
            data: 1
        },
        {
            label: '<!--@render=-->',
            kind: node_1.CompletionItemKind.Snippet,
            data: 2
        },
        {
            label: '<!--@loop(){}-->',
            kind: node_1.CompletionItemKind.Snippet,
            data: 3
        }
    ];
});
// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item) => {
    console.log(item);
    if (item.data === 1) {
        item.detail = `${ttPrefix} Partial`;
        item.documentation = `${ttPrefix} @partial documentation`;
    }
    else if (item.data === 2) {
        item.detail = `${ttPrefix} Render`;
        item.documentation = `${ttPrefix} @render documentation`;
    }
    return item;
});
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map