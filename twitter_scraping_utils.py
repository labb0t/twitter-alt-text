def get_recent_tweet_images_and_alt(num_tweets):
'''
Given a number of desired records, will return tweet information, including alt text for recent english language tweets that contain images.
'''    
    # get the ids of n recent tweets
    tweet_id_list = []
    for tweet in tweepy.Cursor(api.search,
                               q="filter:twimg -filter:retweets", 
                               count=100,lang="en",
                               result_type="recent"
                              ).items(num_tweets):
        tweet_id_list.append(tweet.id_str)
    
    # initialize empty list to hold tweet information
    tweets_info_list = []
    
    # need to batch statuses_lookup in groups of 100
    for i in range((num_tweets // 100) + 1):
            
        # Catch the last group if it is less than 100 tweets
        end_loc = min((i + 1) * 100, num_tweets)
        
        # select current window using i
        window = tweet_id_list[i * 100:end_loc]
        
        # look up the tweets in the window 
        try:
            tweet_lookup = api.statuses_lookup(id_=window, include_entites=True,trim_user=True,include_ext_alt_text=True)
            
            # append that window's info to list
            for tweet in tweet_lookup:
                try:
                    tweets_info_list.append([
                        tweet.id_str, 
                        tweet.created_at, 
                        tweet.text, 
                        tweet.entities['media'][0]['url'], 
                        tweet.extended_entities['media'][0]['media_url'],
                        tweet.extended_entities['media'][0]['ext_alt_text'],
                        tweet.extended_entities['media'][0]['type']
                        ])
                except:
                    pass
            #time.sleep(2)
        except:
            pass

    # format list of lists as dataframe
    tweets_df = pd.DataFrame(tweets_info_list,columns=['id','created_at','tweet_text', 'tweet_url','img_url','alt_text','media_type'])
    
    #save to pickle
    filename = time.strftime("%Y%m%d-%H%M%S")+'.pickle'
    tweets_df.to_pickle('twitter_data/'+filename)
    
    return tweets_df