# RecBlog

I started this project as well as a way to make myself more familiar with the frontend side of Full Stack using NextJS, Mantine and TailwindCSS. Later on (currently) this has become my Final Year Project for BCA.

The backend part of this project can be found in [this repository](https://github.com/rsresta07/kathanika-blog-backend).

There may be a lot of things I have made mistake and a lot of things that I may be able to improve. I will leave it to future [Rameshwor](https://github.com/rsresta07).

## TODO

- [ ] make CommonForm for add post, edit post, and edit profile

## Documentation

The project uses NextJS a framework of react.js. Mantine has been used as pre-built react components and Tailwind for the styles.

The main parts of this project are: Admin dashboard, user profile, List of Posts, Post Page, CRUD operations, filter based on Tags _(will be added in future)_ and Content Based and Collabrative Algorithm.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

## Script to populate postgres

change the id of tag and user

```script
DO $$
DECLARE
  user_ids UUID[] := ARRAY[
    '37bf0089-6cd8-4889-90cc-c1eaaa52c671',
    'b0fffecb-7de1-4d07-921b-d67ced8a7d09',
    'bbf99ff3-8eee-4e23-9cb4-31f4e35c4b59',
    '8dc3896c-53a3-40db-9c77-59868771bdb1',
    '0f160764-02b8-41cc-b34c-af01149f1a27',
    '1062e423-a67c-4024-893f-b5d7d6ae7d57'
  ];

  tag_ids UUID[] := ARRAY[
    '1295bb9b-7fa0-45ab-b299-ec45ef606e68',
    '4a344ba3-4494-4db9-a58c-d39de6763428',
    '8cb6f7e5-9f28-44db-96fd-bc4b45455700',
    '9feb5b6a-322e-487b-a968-ff5c3b3a111a',
    'bcffa1c6-be2d-4663-be7a-83bfe0b50d0f',
    'e0983643-cfd0-47ed-98cb-05213fd5778d'
  ];

  user_id UUID;
  new_post_id UUID;
  title TEXT;
  content TEXT;
  slug TEXT;
  i INT := 1;
  selected_tag_ids UUID[];
  tag_count INT;
BEGIN
  FOREACH user_id IN ARRAY user_ids
  LOOP
    title := 'Blog Post ' || i;
    content := 'This is content for blog post number ' || i;
    slug := lower(replace(title, ' ', '-'));

    INSERT INTO posts (title, content, image, slug, status, search_vector, user_id)
    VALUES (
      title,
      content,
      '/L001.jpg',
      slug,
      TRUE,
      to_tsvector('english', title || ' ' || content),
      user_id
    )
    RETURNING post_id INTO new_post_id;

    -- Randomly pick 1 or 2 unique tags
    tag_count := 1 + floor(random() * 2); -- gives 1 or 2
    SELECT ARRAY(
      SELECT tag_ids[i]
      FROM generate_subscripts(tag_ids, 1) AS i
      ORDER BY random()
      LIMIT tag_count
    ) INTO selected_tag_ids;

    -- Link selected tags
    FOREACH tag_id IN ARRAY selected_tag_ids
    LOOP
      INSERT INTO post_tag (post_id, tag_id)
      VALUES (new_post_id, tag_id);
    END LOOP;

    i := i + 1;
  END LOOP;
END $$;
```

## Project Setup

```bash
  yarn install
```

## Run Locally

Clone the project

```bash
# development
$ yarn run start

# watch mode
$ yarn dev

# production mode
$ yarn run start:prod
```

## Reference

The UI was reference from Figma Community. [link here](https://www.figma.com/proto/r19t6yYbD7IICxLFK4tQqT/The-Blog---A-Web-Personal-Blog--Community-?node-id=614-679&starting-point-node-id=614%3A679&show-proto-sidebar=1&t=qbZKgvjOyJU2kww9-1)

## License

[MIT](https://choosealicense.com/licenses/mit/)
