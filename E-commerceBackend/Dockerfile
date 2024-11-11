FROM registry.hub.docker.com/library/openjdk:22-jdk

ADD target/backend.jar backend.jar

ENTRYPOINT ["java", "-jar", "/backend.jar"]
