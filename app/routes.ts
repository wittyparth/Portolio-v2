import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("animes", "routes/animes.tsx"),
  route("books", "routes/books.tsx"),
  route("contact", "routes/contact.tsx"),
  route("projects", "routes/projects.tsx"),
  route("blog", "routes/blog.tsx"),
  route("terminal", "routes/terminal.tsx"),
  route("typing-test", "routes/typing-test.tsx"),
  route("personal", "routes/personal.tsx"),
  route("current-focus", "routes/current-focus.tsx"),
  route("failures", "routes/failures.tsx"),
  route("recommendations", "routes/recommendations.tsx"),
  route("logs", "routes/logs.tsx"),
  route("blog-post", "routes/blog-post.tsx"),
  route("speed-stats", "routes/speed-stats.tsx"),
  route("guestbook", "routes/guestbook.tsx"),
] satisfies RouteConfig;
