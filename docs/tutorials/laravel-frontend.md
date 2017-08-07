# Laravel Frontend

> #### Warning::STUB!
>
> This is a stub. We should probably make a full boilerplate repo for Laravel that includes examples and docs.

Laravel 5.3 uses Elixir, a build system abstraction built on top of Gulp, to compile CSS and Javascript.

It comes pre-loaded with...

- Bootstrap Sass 3.0
- Vue.js

Laravel 5.4 introduces Mix, which is a replacement for Elixir built on top of Webpack.

## Basic Setup

- `composer install`
- `touch database/database.sqlite`
- Change your .env file to accomodate sqlite:

```
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite
```
- `php artisan migrate`
- `npm install`

## First Build w/Bootstrap

- Uncomment the line referencing Bootstrap in app.scss
- `gulp`
- `php artisan serve`

You should be able to navigate to `localhost:8000` and see a basic welcome page.

## Create Your First Static View

### Create a Route

### Create a Controller

### Create a View

## Basic View Structure

You'll want to use Blade's handy `@include` syntax to create sub-templates and otherwise organize your templates. For example, my boilerplate structure looks like this:

```
<html>
@include('head')
@include('navbar')
<body>
@yield('content')
</body>
</html>
```

The "head" file has basic meta tags and other content in the `<head>` section, and then the basic layout of the page is included as necessary.

## Adding Metadata
Laravel doesn't come with a page setup for you out-of-the-box; that means basic elements like `<head>` aren't present and don't have all the handy metadata you might desire.

Fortunately there's some good projects to help you handle these needs.

[laravel-meta](https://github.com/eusonlito/laravel-Meta) allows you to set defaults for SEO-friendly meta data and set controller-specific settings as well.


## Resources

- [Laravel Boiler Plate](https://github.com/rappasoft/laravel-5-boilerplate/tree/Legacy_5.3/resources/views/frontend): Interesting boilerplate project; helpful if looking for inspiration on how to organize your Laravel projects.
- [Laravel Bootstrap Admin Theme](https://github.com/start-laravel/sb-admin-laravel-5): Example of a Bootstrap implementation in Laravel.