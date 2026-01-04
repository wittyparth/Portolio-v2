import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  // All routes are wrapped in the MainLayout for consistent header/footer
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("animes", "routes/animes.tsx"),
    route("books", "routes/books.tsx"),
    route("contact", "routes/contact.tsx"),
    route("projects", "routes/projects.tsx"),
    route("blog", "routes/blog.tsx"),
    route("terminal", "routes/terminal.tsx"),
    route("typing-test", "routes/typing-test.tsx"),
    route("failures", "routes/failures.tsx"),
    route("recommendations", "routes/recommendations.tsx"),
    route("logs", "routes/logs.tsx"),
    route("blog-post", "routes/blog-post.tsx"),
    route("guestbook", "routes/guestbook.tsx"),
  ]),
] satisfies RouteConfig;


