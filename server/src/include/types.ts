// The example settings
export interface ExampleSettings {
	maxNumberOfProblems: number;
	featureSupportVersion: [number, number, number];
}

// the global settings used when the `workspace/configuration` request is not supported by the client.
export const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000, featureSupportVersion: [0, 6, 14] };
