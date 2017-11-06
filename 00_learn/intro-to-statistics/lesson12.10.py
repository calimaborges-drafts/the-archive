# The cancer example
# p(C) = p0
# p(Pos|C) = p1
# p(Neg|!C) = p2
#
# The function should return the value of p(Pos)
#
# VENN GRAPH (area wanted marked with x):
#          p(C)  p(!C)
#          +---+----------------------+
#          +---+xxxxxxxxxxxxxxxxxxxxxx|
#          |xxx+----------------------+
# Pos|C -> |xxx|                      |
#          |xxx|                      | -> Neg|!C
#          |xxx|                      |
#          +---+----------------------+
#
# Result: (p(C) * p(Pos|C)) + ((1 - p(C)) * (1 - p(Neg|!C))


def f(p0, p1, p2):
    return (p0 * p1) + ((1 - p0) * (1 - p2))


print f(0.1, 0.9, 0.8)
