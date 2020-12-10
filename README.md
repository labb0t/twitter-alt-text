# Using deep learning to generate alt text for images on Twitter
While Twitter has supported image alt text since 2016, my analysis finds that only **one in 300** images shared on twitter has alt text, making the vast majority of image content inaccessible to users who rely on screenreaders.

With recent advancements in deep learning, image caption generation models can perform pretty well, presenting the opportunity to auto-caption images to make them accessible to all users. I tested creating training my own caption generation model, but realized that twitter image data is too diverse for a model trained on traditional image/caption photographic datasets (e.g. Flickr, COCO). 

I ran a clustering analysis on a sample of twitter images to get a better sense of what kind of non-photographic images are common on twitter. The clusters identified included computer and mobile screenshots, memes, videogames, and art. 

Ultimately, I came to the conclusion that deep learning is best leveraged as a suggestion for the image-sharer, because 1) creating an image caption generation model for a dataset as diverse as twitter's proved challenging, and 2) good alt text often requires context from the author. So I created a chrome extension that reminds the user to add alt text when it detects that an image is being uploaded on Twitter. Twitter users who care about making their content accessible could install this, but ultimately I hope it can serve as a proof of concept for functionality that Twitter could implement natively; with a reminder and suggested caption based on a model's prediction.

## Summary of Files
1. Twitter scraping utils contains the script I used to scrape image tweets from twitter using Tweepy.
2. The notebooks folder contains the jupyter notebooks I used for analysis and modeling: 
    * **twitter alt text analysis** includes an analysis of the rate of alt text usage. This depends on SpacyPreprocessor.py and TopicModeling.py
    * **twimg clustering** is the clustering analysis on a random sample of 500 twitter images from my dataset
    * **caption model notebooks** are my modeling notebooks, run on Google Colab using a GPU. Big thank you to [Jeff Heaton](https://github.com/jeffheaton) for his deep neural networks resources.
3. The chrome extension folder contains all files to create the chrome browser extension.
4. [Twitter alt text Presentation](https://github.com/labb0t/twitter-alt-text/blob/main/twitter_alt_text_presentation.pdf) is a presentation summarizing my entire process and findings.



