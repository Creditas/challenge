import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val jUnitVersion = "5.5.0"
val mockitoKotlinVersion = "2.1.0"
val mockitoVersion = "2.25.1"

plugins {
    kotlin("jvm") version "1.3.41"
}

group = "challenge"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    implementation(kotlin("stdlib-jdk8"))
    testImplementation(kotlin("test-junit5"))
    testImplementation("org.junit.jupiter:junit-jupiter:${jUnitVersion}")
    testCompile("org.mockito:mockito-core:${mockitoVersion}")
    testCompile("org.mockito:mockito-junit-jupiter:${mockitoVersion}")
    testCompile("com.nhaarman.mockitokotlin2:mockito-kotlin:${mockitoKotlinVersion}")
}

tasks.test {
    useJUnitPlatform()
    testLogging {
        events("passed", "skipped", "failed")
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}
