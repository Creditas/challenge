

class DataModel:
    @classmethod
    def create(cls, data):
        ''' Create a new model in database and return a class instance. '''
        return cls(data_id)

    def update(self, data):
        ''' Update informations related to the instance in database. '''
        self._data = data

    def delete(self):
        ''' Delete data in database. '''
        pass
