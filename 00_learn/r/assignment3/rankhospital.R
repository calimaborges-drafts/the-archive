rankhospital <- function(state, outcome, num = "best") {
    ## Read outcome data
    data <- read.csv("outcome-of-care-measures.csv", colClasses = "character")
    
    ## Check that state and outcome are valid
    deathRateColumns <- list("heart attack" = 11, "heart failure" = 17, "pneumonia" = 23)
    
    # Clear columns
    columns <- unlist(deathRateColumns, use.names = F);
    for (column in columns) {
        data[, column] = as.numeric(data[, column])
        data = data[complete.cases(data[, column]),]
    }
    
    if (!(outcome %in% names(deathRateColumns))) stop("invalid outcome")
    if (!(state %in% data$State)) stop("invalid state")
    
    # filtering by state
    filtered <- subset(data, State == state)
    
    # ordering by death rate
    column <- unlist(deathRateColumns[outcome], use.names = F);
    columnName = names(filtered[column])
    ordered <- order(filtered[,columnName], filtered[,'Hospital.Name'])
    filtered <- filtered[ordered, ]
    
    ## Return hospital name in that state with the given rank
    ## 30-day death rate
    if (num == "best") num = 1
    if (num == "worst") num = nrow(filtered)
    if (num > nrow(filtered)) return(NA)
    
    filtered$Hospital.Name[num]
}




    