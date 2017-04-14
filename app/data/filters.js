export const filters = [
    {
        name: 'All',
        check: function(statusCode) { return true }
    },
    {
        name: 'Success',
        check: function(statusCode) { return statusCode >= 200 && statusCode < 300 }
    },
    {
        name: 'Failed',
        check: function(statusCode) { return statusCode < 200 || statusCode >= 300 }
    }
];