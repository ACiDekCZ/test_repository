# test_repository
Test repository

## Assets
The dog sprite image is stored as a base64 text file at `assets/images/dog_sprite.base64`. This keeps binary assets out of version control.

To regenerate the original `dog_sprite.png` for local use, run:

```
base64 -d assets/images/dog_sprite.base64 > assets/images/dog_sprite.png
```

The game loads and decodes the base64 sprite at runtime.
