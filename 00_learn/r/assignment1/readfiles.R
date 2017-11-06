readfiles <- function(directory, names) {
        files <- c()
        for (file in names) {
                file_str = sprintf("%03d", file)
                path = paste(directory, "/", file_str, ".csv", sep="")
                files <- c(files, path)
        }
        
        files
} 