Error.stackTraceLimit = Infinity;

var testsContext = require.context(".", true, /\.spec\.ts$/);

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

var modules = requireAll(testsContext);