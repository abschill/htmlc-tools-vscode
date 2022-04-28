import {
    AST_CLOSE_SCOPE,
    AST_RENDER_SIGNATURE,
    AST_PARTIAL_SIGNATURE,
    AST_LOOP_SIGNATURE,
    AST_RENDER_REGGIE,
    AST_PARTIAL_REGGIE,
    AST_LOOP_OPEN_REGGIE,
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
		signature: AST_LOOP_OPEN_REGGIE,
		diagnosticName: 'Loop Signature',
		diagnosticMsg: 'html-chunk-loader iterator',
		detailMsg: 'gives you the ability to iterate over variables defined in a template'
	},
	{
		signature: AST_RENDER_REGGIE,
		diagnosticName: 'Render Matcher',
		diagnosticMsg: 'html-chunk-loader value insertion directive(regex)',
		detailMsg: 'loads a variable from your runtime/inline configuration to the template'
	}
];
