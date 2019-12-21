class CreditCard:
    
    @staticmethod
    def fetch_by_hashed(code):
        '''
        Returns valid CreditCard based on input code.
        
        Args:
            code (string): code used to generate CreditCard
        '''
        return CreditCard()