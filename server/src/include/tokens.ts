import {
    AST_CLOSE_SCOPE,
    AST_RENDER_SIGNATURE,
    AST_PARTIAL_SIGNATURE,
    AST_LOOP_SIGNATURE,
	AST_OPEN_SCOPE,
	AST_DT
} from 'html-chunk-loader/lib/compiler/parser/constants';
export * from 'html-chunk-loader/lib/compiler/parser/constants.js';
export type LintableToken = {
	signature: RegExp;
	diagnosticMsg: string;
	diagnosticName: string;
	detailMsg: string;
}

export const EXT_TOKEN_MAP: LintableToken[] = [
	{
		signature: new RegExp(AST_RENDER_SIGNATURE),
		diagnosticName: 'Render Matcher',
		diagnosticMsg: 'html-chunk-loader value insertion directive(regex)',
		detailMsg: 'loads a variable from your runtime/inline configuration to the template'
	},
	{
		signature: new RegExp(AST_PARTIAL_SIGNATURE),
		diagnosticName: 'Partial Matcher',
		diagnosticMsg: 'html-chunk-loader partial',
		detailMsg: 'loads a partial chunk from the configured path by name'
	},
	{
		signature: new RegExp(AST_LOOP_SIGNATURE),
		diagnosticName: 'Loop Signature',
		diagnosticMsg: 'html-chunk-loader iterator',
		detailMsg: 'gives you the ability to iterate over variables defined in a template'
	},
	{
		signature: new RegExp(AST_OPEN_SCOPE + AST_DT),
		diagnosticName: 'Open Scope',
		diagnosticMsg: 'html-chunk-loader scope open',
		detailMsg: 'opens scope for html template variable'
	},
	{
		signature: new RegExp(AST_CLOSE_SCOPE),
		diagnosticName: 'Close Scope',
		diagnosticMsg: 'html-chunk-loader scope close',
		detailMsg: 'closes block scope in html template'
	}
];
