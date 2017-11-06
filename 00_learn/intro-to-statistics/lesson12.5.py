# Return the probability of exactly one head in three flips


def f(p):
    return 3 * (p * (1 - p) * (1 - p))
