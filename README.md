# Using deep learning to generate alt text for images on Twitter
While Twitter has supported image alt text since 2016, my analysis finds that only **one in 300** images shared on twitter has alt text, making the vast majority of image content inaccessible to users who rely on screenreaders.

With recent advancements in deep learning, image caption generation models can perform fairly well, presenting the opportunity to auto-caption images to make them accessible to more users. I tested creating training my own caption generation model, but quickly came to the conclusion that twitter image data is too diverse for a model trained on traditional image/caption photographic datasets (e.g. Flickr, COCO). 

Next, I set out to describe some of the diversity in image Twitter data. To do this, I ran a clustering analysis on a sample of twitter images to get a better sense of what kind of non-photographic images are common on twitter (i.e. the images that wouldn't be covered by traditional photo datasets). The clusters identified included computer and mobile screenshots, memes, videogames, and art. I also did a topic modeling analysis of the alt text in my scraped Twitter data.

Ultimately, I came to the conclusion that deep learning is best leveraged as a suggestion for the image-sharer, because 1) creating an effective image caption generation model for a dataset as diverse as twitter's proved challenging with my time and resource constraints, and 2) even with a well-performing model, good alt text often requires context from the author. So I created a chrome extension that reminds the user to add alt text when it detects that an image is being uploaded to Twitter. Twitter users who care about making their content accessible could install this extension, but ultimately I hope it can serve as a proof of concept for functionality that Twitter could implement natively -- with both a reminder to add alt text and a suggested caption based on a model's prediction.

## Summary of Files
1. Twitter scraping utils contains the script I used to scrape image tweets from twitter using Tweepy.
2. The notebooks folder contains the jupyter notebooks I used for analysis and modeling: 
    * **alt text adoption analysis** includes an analysis of the rate of alt text usage.
    * **preprocessing_captionmodel_clustering** was used to prep the scraped alt text for use as training data for the image caption model, as well as to download images for the caption model and clustering analysis.
    * **twimg clustering** is the clustering analysis on a random sample of 500 twitter images from the dataset I scraped.
    * **tweet_alttext_topicmodeling** contains the topic modeling analysis of This depends on SpacyPreprocessor.py and TopicExploration.py
    * **caption model notebooks** are my modeling notebooks, run on Google Colab using a GPU. Big thank you to [Jeff Heaton](https://github.com/jeffheaton) for his deep neural networks resources.
3. The chrome extension folder contains all files to create the chrome browser extension.
4. [Twitter alt text presentation](https://github.com/labb0t/twitter-alt-text/blob/main/twitter_alt_text_presentation.pdf) is a presentation summarizing my entire process and findings.



