best <- function(state, outcomeName) {
    ## Read outcome data
    outcome <- read.csv("outcome-of-care-measures.csv", colClasses = "character")
    
    ## Check that state and outcome are valid
    lowerMortalityColumns <- list("heart attack" = 13, "heart failure" = 19, "pneumonia" = 25)
    upperMortalityColumns <- list("heart attack" = 14, "heart failure" = 20, "pneumonia" = 26)
    
    # Clear lower mortality columns
    columns <- unlist(lowerMortalityColumns, use.names = F);
    
    for (column in columns) {
        outcome[, column] = as.numeric(outcome[, column])
        outcome = outcome[complete.cases(outcome[, column]),]
    }
    
    # Clear upper mortality columns
    columns <- unlist(upperMortalityColumns, use.names = F);
    
    for (column in columns) {
        outcome[, column] = as.numeric(outcome[, column])
        outcome = outcome[complete.cases(outcome[, column]),]
    }
    
    if (!(outcomeName %in% names(lowerMortalityColumns))) stop("invalid income")
    if (!(state %in% outcome$State)) stop("invalid state")
    
    ## Return hospital name in that state with lowest 30-dau death
    ## rate
    
    # filtering by state
    filtered <- subset(outcome, State == state)
    
    # filtering by lower mortality
    column <- unlist(lowerMortalityColumns[outcomeName], use.names = F);
    columnName = names(outcome[column])
    filtered <- filtered[filtered[columnName] == min(filtered[columnName]), ]
    
    # if more than 1 than use upper mortality
    if (nrow(filtered) == 1) return(filtered$Hospital.Name)
    
    column <- unlist(upperMortalityColumns[outcomeName], use.names = F);
    columnName = names(outcome[column])
    filtered <- filtered[filtered[columnName] == min(filtered[columnName]), ]
    
    filtered$Hospital.Name
}