class Membership:

    def __init__(self):
        '''
        Constructor for Membership class.
        '''
        self.bonus_credit = 0

    def increment_bonus(self, bonus_credit):
        '''
        Increments bonus credit.

        Args:
            bonus_credit (int): increment to current bonus credit.
        '''
        self.bonus_credit = self.bonus_credit + bonus_credit