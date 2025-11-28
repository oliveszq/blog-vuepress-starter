export const series = {
  "/series/java/": [
    {
      text: 'Java 入门',
      collapsible: false,
      children: [
        '01-introduction/01-what-is-java',
        '01-introduction/02-java-platforms',
        '01-introduction/03-environment-setup'
      ]
    },
    {
      text: '基础语法',
      collapsible: true,
      children: [
        '02-basic-syntax/01-variables',
        '02-basic-syntax/02-data-types',
        '02-basic-syntax/03-operators',
        '02-basic-syntax/04-control-flow',
        '02-basic-syntax/05-methods'
      ]
    },
    {
      text: '面向对象编程',
      collapsible: true,
      children: [
        '03-object-oriented/01-oop-concepts',
        '03-object-oriented/02-classes-and-objects',
        '03-object-oriented/03-inheritance',
        '03-object-oriented/04-polymorphism',
        '03-object-oriented/05-interfaces',
        '03-object-oriented/06-abstract-classes'
      ]
    },
    {
      text: '核心 API',
      collapsible: true,
      children: [
        '04-core-api/01-string',
        '04-core-api/02-wrapper-types',
        '04-core-api/03-exceptions',
        '04-core-api/04-file-io',
        '04-core-api/05-annotations'
      ]
    },
    {
      text: '集合框架',
      collapsible: true,
      children: [
        '05-collections/01-collection-overview',
        '05-collections/02-list',
        '05-collections/03-set',
        '05-collections/04-map',
        '05-collections/05-collections-algorithms'
      ]
    },
    {
      text: '泛型编程',
      collapsible: true,
      children: [
        '06-generics/01-why-generics',
        '06-generics/02-generic-methods'
      ]
    },
    {
      text: '多线程与并发',
      collapsible: true,
      children: [
        '07-multithreading/01-thread-basics',
        '07-multithreading/02-runnable',
        '07-multithreading/03-thread-safety',
        '07-multithreading/04-synchronized',
        '07-multithreading/05-locks',
        '07-multithreading/06-thread-pool'
      ]
    },
    {
      text: 'JVM 工作原理',
      collapsible: true,
      children: [
        '08-jvm/01-jvm-architecture',
        '08-jvm/02-class-loading',
        '08-jvm/03-memory-structure',
        '08-jvm/04-gc',
        '08-jvm/05-jvm-tuning'
      ]
    },
    {
      text: 'Java 8 新特性',
      collapsible: true,
      children: [
        '09-java8-features/01-lambda',
        '09-java8-features/02-stream',
        '09-java8-features/03-new-date-api'
      ]
    },
    {
      text: 'Spring 全家桶',
      collapsible: true,
      children: [
        '10-spring/01-spring-ioc',
        '10-spring/02-spring-aop',
        '10-spring/03-spring-boot-intro',
        '10-spring/04-spring-mvc'
      ]
    },
    {
      text: '数据库与持久化',
      collapsible: true,
      children: [
        '11-database/01-jdbc',
        '11-database/02-mybatis',
        '11-database/03-spring-data-jpa'
      ]
    },
    {
      text: '项目实战',
      collapsible: true,
      children: [
        '12-project/01-project-env',
        '12-project/02-backend-api-design',
        '12-project/03-spring-boot-demo',
        '12-project/04-deploy'
      ]
    }
  ]
}
