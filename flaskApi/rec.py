import pandas as pd

def recommend(schoolProfile,userdata):
    tab = pd.DataFrame(list(schoolProfile))
    userdata = userdata.drop('user',axis= 1)
    tab["idScuola"] = tab["idScuola"].sort_values(ascending=True).values
    userProfile = userdata.transpose()
    userProfile = userProfile.iloc[1: , :]
    userProfile = userProfile.squeeze()
    genreTable = tab.set_index(tab['idScuola'])
    #And drop the unnecessary information
    #And drop the unnecessary information
    genreTable = tab.drop('scuola', axis=1).drop('idScuola', axis=1).drop("orientation" , axis=1)
    recommendationTable_df = ((genreTable*userProfile).sum(axis=1))/(userProfile.sum())
    recommendationTable_df = recommendationTable_df.sort_values(ascending=False)
    #Just a peek at the values
    c = recommendationTable_df.index[0]
    #The final recommendation table
    df2 = tab[tab['idScuola'] == c].drop("_id" , axis=1)
    result = {}
    for index, row in df2.iterrows():
        #result[index] = row.to_json() 
        result[index] = dict(row)
    return result