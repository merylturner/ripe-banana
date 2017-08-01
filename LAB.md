<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" 
width=30> Ripe Banana
===

## Description

For this assignment, you'l be creating a database of movie films (with reviews), movie studios, actors, reviews and reviewers.

**You must work in groups of 2-3 on this lab**

### Models

* Studio
* Film
* Actor
* Reviewer
* Review

#### Key
* `<...>` is a placeholder for actual data.
* `S` = string, `D` = date, `N` = number, `I` = ObjectId
* Properties marked with `R` are required.

#### Studio

```
{
  name: <name-of-studio RS>,
  address: {
    city: <city S>
    state: <state S>
    country: <country S>
  }
}
```

#### Film

```
{
  title: <title of film RS>,
  studio: <studio _id RI>,
  released: <4-digit year RN>,
  cast: [{
    role: <name of character S>,
    actor: <actor _id RI>
  }]
}
```


#### Actor

```
{ 
  name: <name RS>,
  dob: <date-of-birth D>,
  pob: <place-of-birth S>
}
```

#### Reviewer

```
{ 
  name: <string RS>,
  company: <company or website name RS>
}
```


#### Review

```
{ 
  rating: <number 1-5 RN>,
  reviewer: <review _id RI>
  review: <review-text, max-length 140 chars RS>,
  film: <film-id RI>,
  createdAt: <created timestamp RD>,
  updatedAt: <updated timestamp RD>
}
```


### Routes

#### GET

route | returns
---|---
`GET /studios` | [ { name } ]
`GET /studios/:id` | { name, address, films: [{ title }] }
`GET /films` | [{ title, released, studio.name }]
`GET /films/:id` | { title, released, studio.name, cast: [ { role, actor-name } ], reviews: [rating, review, reviewer.name] }
`GET /actors` | [{ name }]
`GET /actors/:id` | { name, dob, pob, films: [ name, released ] }
`GET /reviewer` | [{ name, company }]
`GET /reviewer/:id` | { name, company, reviews: [ film.name, rating, review ] }
`GET /reviews` | [{ rating, review, film.name }] *limit to 100 most recent

[NOTE: okay if nesting of properties different than spec do to normal populate]

#### POST/PATCH

Studio, Films, and Actors, Reviewers and Reviews can be added or updated.

Actors are added to films as part of normal film insert or update.

#### DELETE

Studio, Films, and Actors can be deleted. However, studios cannot be deleted if there are films and
actors cannot be deleted who are in films.

## Testing

* Write appropriate unit and E2E/API tests.

## Rubric:

* Models: 5pts
* Relationships: 5pts
* Routes: 5pts
* Project Organization and Testing: 5pts
