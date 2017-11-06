source("readfiles.R")
complete <- function(directory, id = 1:332) {
        ## 'directory' is a character vector of length 1 indicating
        ## the location of the CSV files
        
        ## 'id' is an integer vector indicating the monitor ID numbers
        ## to be used
        files <- readfiles(directory, id)
        nobs = c()
        
        for (file in files) {
                table <- read.csv(file)
                working_data <- subset(table, !is.na(table["sulfate"]))        
                working_data <- subset(working_data, !is.na(working_data["nitrate"]))
                nobs <- c(nobs, nrow(working_data))
        }
        
        ## Return a data frame of the form:
        ## id nobs
        ## 1  117
        ## 2  1041
        ## ...
        ## where 'id' is the monitor ID number and 'nobs' is the
        ## number of complete cases
        
        data.frame(id=id, nobs=nobs)
}