Proposal for [this challenge](https://github.com/Creditas/challenge/tree/master/backend)

#### thoughts

* you guys use DDD... nice 🙂
    * nice challenge you guys have here. The infra x service x domain is a good subject. For instance, [here](https://github.com/BottegaIT/ddd-leaven-v2) guys are using Autowire / Inject into domain classes. [Here](https://github.com/mkopylec/project-manager), domain receives a service on each call. [The sample from book](https://github.com/citerus/dddsample-core) points that it should be in a service (but I can be wrong).
* [Markdown](https://www.markdownguide.org/)? Please consider [AsciiDoc](http://asciidoc.org/)
* "Frameworks not required" - I can see some guys adding [Spring](https://spring.io/) here 🙂

#### Notes, references

* [Default files](https://gist.github.com/adamatti/3c1b063e71a14424b3db89710e293e22)
* [Kotlin + gradle](https://github.com/Kotlin/kotlin-examples/blob/master/gradle/hello-world/build.gradle)
    * I should provide a wrapper, but thought it is not required for this sample
* [Makefile](https://en.wikipedia.org/wiki/Makefile) - it does help if you work with multiple languages
* [Spock](http://spockframework.org) - test framework
    * We could use [cucumber](https://cucumber.io/) for BDD as well (this is a team decision)
    * Why not [junit](https://junit.org)? Spock has features like [Data Driven test](http://spockframework.org/spock/docs/1.0/data_driven_testing.html), [mocks / stubs / spys](http://spockframework.org/spock/docs/1.0/interaction_based_testing.html), etc
* Only on membership process was created service / infra, let me know if want to apply the same for others (Don't think this is required for this sample)
* A rule engine could be used if the rules change frequently