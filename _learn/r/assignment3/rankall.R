source("rankhospital.R")

rankall <- function(outcome, num = "best") {
        ## Read outcome data
        data <- read.csv("outcome-of-care-measures.csv", colClasses = "character")
        deathRateColumns <- list("heart attack" = 11, "heart failure" = 17, "pneumonia" = 23)
        
        ## Check that state and outcome are valid
        if (!(outcome %in% names(deathRateColumns))) stop("invalid outcome")
        
        # Get states
        states <- unique(data$State)
        states <- states[order(states)]
        
        ranks <- character(length(states))
        i <- 0
        for (state in states) {
                i <- i + 1
                ranks[i] = rankhospital(state, outcome, num)
        }
        
        ## Return a data frame with the hospital names and the
        ## (abbreviated) state name
        data.frame(hospital = ranks, state = states)
}