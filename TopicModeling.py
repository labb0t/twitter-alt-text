import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.decomposition import NMF, TruncatedSVD, LatentDirichletAllocation

class topic_model():

    def __init__(
        self, 
        data=None, 
        vectorizer=CountVectorizer(), 
        model=None, 
        num_topics=10,
        random_state=None
        ):
        '''
        Vectorize and topic model a given text
        :param data: list of document texts
        :param vectorizer: which vectorizor to use:
        :param model: which model to use: 'lda', 'lsa' or 'nmf'
        '''
        self.data = data
        self.vectorizer = vectorizer
        self.model = model
        self.num_topics = num_topics
        self.random_state = random_state      

    def get_topics(self):
        self.doc_word = self.vectorizer.fit_transform(self.data)
        self.doc_word_df = pd.DataFrame(self.doc_word.toarray(),columns = self.vectorizer.get_feature_names())
        self.feature_names = self.vectorizer.get_feature_names()
        if self.model == "lsa":
            model = TruncatedSVD(self.num_topics,random_state=self.random_state)
        elif self.model == "nmf":
            model = NMF(self.num_topics,random_state=self.random_state)
        elif self.model == 'lda':
            model = LatentDirichletAllocation(self.num_topics,random_state=self.random_state)
        else: print("Please define a valid model.")
        for ix, topic in enumerate(model.components_):
            print("\nTopic ", ix)
            print(", ".join([self.feature_names[i] for i in topic.argsort()[:-16:-1]]))