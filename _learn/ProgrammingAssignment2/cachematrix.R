## Matrix inversion is usually a costly computation and there may be some
## benefit to caching the inverse of a matrix rather than computing it
## repeatedly. The following pair of functions cache the inverse of a matrix.


## This function creates a special "matrix" object that can cache its inverse.
makeCacheMatrix <- function(x = matrix()) {
    inverseMatrix <- NULL

    ## Set the new matrix and clean previous inverseMatrix
    set <- function(y) {
        x <<- y
        inverseMatrix <<- NULL
    }

    ## Get current matrix
    get <- function() x

    ## Update inverse matrix
    setinverse <- function(inverse) inverseMatrix <<- inverse

    ## Get current inverse matrix
    getinverse <- function() inverseMatrix

    ## Return a group of functions to be used
    list(set = set, get = get, setinverse = setinverse, getinverse = getinverse)
}


## This function computes the inverse of the special "matrix" returned by
## makeCacheMatrix above. If the inverse has already been calculated (and the
## matrix has not changed), then cacheSolve should retrieve the inverse from
## the cache.
cacheSolve <- function(x, ...) {
        ## Get the current inverse matrix stored
        inverseMatrix <- x$getinverse()

        ## If the inverse matrix is not null than it has been calculated
        ## already. Just return the calculated matrix then.
        if (!is.null(inverseMatrix)) {
            message("getting cached data")
            return(inverseMatrix)
        }

        ## If the inverse matrix is null than it should be calculated and
        ## stored (cached).
        data <- x$get()
        inverseMatrix <- solve(data, ...)
        x$setinverse(inverseMatrix)

        ## Return a matrix that is the inverse of 'x'
        inverseMatrix
}
