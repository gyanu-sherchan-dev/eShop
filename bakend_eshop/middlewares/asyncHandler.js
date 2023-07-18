const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

//basically this function takes in req, res and next and it's going to resolve the promise and if it resolves, its going to call next, which then calls next piece of middleware. So, this way we do not have to have all these try catch blocks, we can just handle errors through express, which we will do later, we will create our custom error handler.
