source("readfiles.R")
source("complete.R")
corr <- function(directory, threshold = 0) {
        ## 'directory' is a character vector of length 1 indicating
        ## the location of the CSV files
        working_data <- complete(directory)
        working_data <- subset(working_data, nobs > threshold)
        
        if (nrow(working_data) == 0) return(numeric())
        
        files <- readfiles(directory, working_data$id)
        tables <- lapply(files, read.csv)
        
        corr <- c()
        for (table in tables) {
                table <- subset(table, !is.na(table["sulfate"]))        
                table <- subset(table, !is.na(table["nitrate"]))
                
                corr <- c(corr, cor(table$nitrate, table$sulfate))
        }
        
        
        corr
        #print(cor(tables[1,]$sulfate, tables[1,]$nitrate))

        ## 'threshold' is a numeric vector of length 1 indicating the
        ## number of completely observed observations (on all
        ## variables) required to compute the correlation between
        ## nitrate and sulfate; the default is 0
        
        
        ## Return a numeric vector of correlations
        ## NOTE: Do not round the result!
}