# Pick one coin c1 or c2
# p(c1) = p0
# p(c2) = 1 - p0
# p(H|c1) = p1
# p(H|c2) = p2
# The function should return the probability of p(H)
#
# TRUTH TABLE:
# c1    H   p0 * p(H|c1)
# c1    T   0
# c2    H   (1 - p0) * p(H|c2)
# c2    T   0


def f(p0, p1, p2):
    return (p0 * p1) + ((1 - p0) * p2)


print f(0.3, 0.5, 0.9)
