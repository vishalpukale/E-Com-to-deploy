const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
    .catch((err) => {
        if (!res.headersSent) { // Only send response if headers aren't sent
            res.status(500).json({ message: err.message });
        } else {
            console.error('Headers already sent:', err.message);
        }
    });
};

export default asyncHandler;
