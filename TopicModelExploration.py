import numpy as np

def show_topics(vectorizer, model, n_words=20):
    '''
    for a given fitted vectorizer and topic, show the top N words within each topic
    '''
    keywords = np.array(vectorizer.get_feature_names())
    topic_keywords = []
    for topic_weights in model.components_:
        top_keyword_locs = (-topic_weights).argsort()[:n_words]
        topic_keywords.append(keywords.take(top_keyword_locs))
    return topic_keywords

def show_top_docs(df_doc_topic, topic, n_docs):
    '''
    given a document-topic matrix, show the n-most paradigmatic documents from a selected topic
    '''
    return (df_doc_topic
            .sort_values(by=topic, ascending=False)
            .head(n_docs)['orig_comments']
            .values)