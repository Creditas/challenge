# Desafio Analytics Data Development

**AVISO SOBRE O TESTE SER EM INGLÊS**

Esse teste está em inglês pois acreditamos que a **leitura** em inglês é parte do dia a dia das pessoas em tecnologia. Se você não domina totalmente a língua isso não é de forma alguma um problema. Se precisar de ajuda para esclarecer algum ponto que não ficou claro, não hesite em nos perguntar. :relaxed:

## Introduction

Hi! We're glad to know you intend to work with us in the Creditas Data Engineering team. It means a lot you're taking time to do this programming assignment! :smiley:

This challenge mimics a task we ourselves deal with on a daily basis and it was designed to asses your coding skills. We expect you to deliver a professional solution, taking into account correctness, performance and code organization. :nerd_face:

## The problem: digital media effectiveness

This challenge is about preparing data to analyze digital media effectivenes on our business. If you know nothing about digital marketing that's fine, you're not supposed to and previous knowledge in this matter is not needed. If you do have interest, though, you can read more [here](./digital_marketing.md). Here are some of the key digital marketing concepts:

 - ***Campaign***: a marketing campaign is a series of coordinated advertising actions intended to target a specific group of potential customers;
 - ***Ad Creative***: a graphical image or video that conveys the message being advertised;
 - ***Ad Impressions***: one single occurrence of displaying an ad to a potential customer;
 - ***Clicks***: one single click on the ad that leads the customer to the company's website;

### What you need to do

Using `python` and other tools of your choice:
 - Ingest the data in a database (*to help you, we included a file (Connection.py) with a preconfigured SQLite local database, which doesn't require any previous setup. It's use is optional, meaning you're free to use other databases if you feel more confortable*);
 - Provide a single table ready to be used to answer the questions above;
 - Provide 4 SQL queries in your README that are answers for each of the following questions:
    1. What was the most expensive campaign?
    2. What was the most profitable campaign?
    3. Which *ad creative* is the most effective in terms of clicks?
    4. Which *ad creative* is the most effective in terms of generating *leads*?
 - Explain how to reproduce your solution;

We expect you to understand the data, how the datasets fit together and how to best store/represent data to the end data user.

### The data

There are 4 different datasets to handle and integrate. *They are all made up, it's not real data.*

#### `google_ads_media_costs.jsonl`

This dataset contains ad campaign costs from *Google Ads Platform*, one *json string* per line.

Example:

```json
{
    "date": "2018-10-01",
    "google_campaign_id": 1001,
    "google_campaign_name": "emprestimo_garantia|auto|natal2018",
    "ad_creative_id": 20001,
    "ad_creative_name": "homem_sorrindo_fundo_carro_012",
    "clicks": 3979,
    "impressions": 157767,
    "cost": 20.4
}
```

#### `facebook_ads_media_costs.jsonl`

This dataset contains ad campaign costs from Facebook Ads Platform, one *json string* per line. It is very similar to the previous, but *does not provide the ad creative id* information.

Example:

```json
{
    "date": "2018-10-01",
    "fb_campaign_id": 3001,
    "fb_campaign_name": "emprestimo_garantia|auto|natal2018",
    "clicks": 2265,
    "impressions": 397781,
    "cost": 246.78
}
```

#### `pageviews.txt`

This file comes from the webserver logs and provide pageviews information about a customer visiting our website. It is a purely text file so to extract information from it you have to parse each line and capture just what is needed.

Example:

```txt
203.0.181.219 - [2018-10-01 00:00:00] "GET / HTTP/1.1" 200 http://www.creditas.com.br/emprestimo-com-garantia?ad_creative_id=20003&campaign_id=1002 | device_id: mmRe2Qts07 | referer: http://google.com.br
192.0.5.86 - [2018-10-01 00:00:00] "GET / HTTP/1.1" 200 http://www.bankfacil.com.br/emprestimo-com-garantia?campaign_id=3005 | device_id: i2IJLNavik | referer: http://www.facebook.com
192.14.66.90 - [2018-10-01 00:15:00] "GET / HTTP/1.1" 200 http://www.bankfacil.com.br/emprestimo-com-garantia | device_id: Pk9yEGx715 | referer: https://www.moreira.br/

```

From the URL address you can find the *`ad_creative_id`* and the *`campaign_id`*. The *`referer`* column indicates where it came from, whether from *Google Ads* (`http://google.com.br`), *Facebook Ads* (`http://www.facebook.com`) or organic traffic (anything else).

#### `customer_leads_funnel.csv`

This file represents a copy of a analytical table that already exists in our environment.

| device_id  | lead_id   | registered_at       | credit_decision | credit_decision_at  | signed_at           | revenue  |
| ---------- | --------- | ------------------- | --------------- | ------------------- | ------------------- | -------- |
| 3HTZRCZdLc | 578419657 | 2018-10-01 00:00:50 | A               | 2018-10-05 19:37:50 |                     |          |
| Mr35TsBJtE | 581565131 | 2018-10-01 00:10:22 | D               | 2018-10-01 10:17:22 |                     |          |
| 1ZBFWuW5Qd | 100080974 | 2018-10-01 01:32:12 | A               | 2018-10-04 21:00:12 | 2018-10-07 01:59:12 | 19340.61 |

Keep in mind that a *lead* is an interested person, which may or may not become a customer. The *lead* becomes a customer when he/she signs the contract.

Please note that in the column *credit_decision*, an `A` stands for ***Approved*** and a `D` stands for ***Denied***. Also, you will notice that even if a customer is approved he/she may give up and don't sign the contract; which, in turn, will generate no revenue.

### How to deliver your solution

Create a github private repository and grant access to the user `marcionetov`. Please also reply the original e-mail with the link to this page informing you submitted your solution.
