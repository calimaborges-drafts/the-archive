source("readfiles.R")
pollutantmean <- function(directory, pollutant, id = 1:332) {
        ## 'directory' is a character vector of length 1 indicating
        ## the location of the CSV files
        
        ## 'pollutant' is a character vector of length 1 indicating
        ## the name of the pollutant for which we will calculate the
        ## mean; either "sulfate" or "nitrate".
        
        ## 'id' is an integer vector indicating the monitor ID numbers
        ## to be used
        files <- readfiles(directory, id)
        
        tables <- lapply(files, read.csv)
        tables <- do.call(rbind, tables)
        
        working_data = tables[pollutant]
        working_data = working_data[!is.na(working_data)]
        
        ## Return the mean of the pollutant across all monitors list
        ## in the 'id' vector (ignoring NA values)
        ## NOTE: Do not round the result!
        mean(working_data)
}