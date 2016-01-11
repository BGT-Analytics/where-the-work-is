# UK Jobs data


Install stuff using pip & [homebrew](http://brew.sh/)
```bash
> mkvirtualenv bg-ippr-jobs
> pip install -r requirements.txt
> brew install gdal --with-postgresql
```

Mac users: you will also need the rename library

```bash
> brew install rename
```

Edit the `config.mk` for your settings


Configure make in `config.mk` with your DB settings, then:

```bash
> make created_db
> make all
> make cleanup_shapefiles
```

This will build the necessary geojson files.