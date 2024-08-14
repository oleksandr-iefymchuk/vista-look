import { Request, Response } from 'express';
import { productModel } from '../models/products.js';
import { Product, User } from '../interfaces.js';
// import { apiErrors } from '../constants.js';
// import { HttpError } from '../errors/httpError.js';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  const products: Product[] = await productModel.find({});
  res.json(products);
};

export const saveProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const authUser = (req as Request & { user?: User }).user;

    if (authUser && authUser.isAdmin) {
      const {
        productCode,
        images,
        title,
        slug,
        price,
        quantity,
        sizes,
        discount,
        category,
        dateAdded,
        param,
        description
      } = req.body;

      if (
        !productCode ||
        !images ||
        !title ||
        !slug ||
        !price ||
        !quantity ||
        !discount ||
        !category ||
        !dateAdded ||
        !sizes ||
        !param ||
        !description
      ) {
        res.status(400).json({ message: "Всі поля обов'язкові для створення замовлення!" });
        return;
      } else {
        const newProduct = await productModel.create({
          productCode,
          images,
          title,
          slug,
          price: parseFloat(price),
          sizes,
          quantity: parseFloat(quantity),
          discount: parseFloat(discount),
          category,
          dateAdded,
          param,
          description
        });

        res.status(201).json({ message: 'Товар успішно створено!', newProduct });
      }
    } else {
      res.status(403).json({ message: 'Недостатньо прав для виконання даної операції!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const authUser = (req as Request & { user?: User }).user;
    const { productId } = req.params;

    if (authUser && authUser.isAdmin) {
      const {
        productCode,
        images,
        title,
        slug,
        price,
        quantity,
        sizes,
        discount,
        category,
        dateAdded,
        param,
        description
      } = req.body;

      if (
        !productCode ||
        !images ||
        !title ||
        !slug ||
        price === undefined ||
        price === null ||
        quantity === undefined ||
        quantity === null ||
        discount === undefined ||
        discount === null ||
        !category ||
        !dateAdded ||
        !sizes ||
        !param ||
        !description
      ) {
        res.status(400).json({ message: "Всі поля обов'язкові для оновлення замовлення!" });
        return;
      }

      const updatedProduct = await productModel.findOneAndUpdate(
        { _id: productId },
        {
          productCode,
          images,
          title,
          slug,
          price,
          quantity,
          sizes,
          discount,
          category,
          dateAdded,
          param,
          description
        },
        { new: true }
      );

      if (!updatedProduct) {
        res.status(404).json({ message: 'Товар не знайдено!' });
        return;
      }

      res.status(200).json({ message: 'Товар успішно оновлено!', updatedProduct });
    } else {
      res.status(403).json({ message: 'Недостатньо прав для виконання даної операції!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as Request & { user?: User }).user;
    const { productId } = req.params;

    if (!productId) {
      res.status(400).json({ message: "ID товару є обо'язковим" });
      return;
    }

    if (!user) {
      res.status(401).json({ message: 'Ви не авторизовані!' });
      return;
    }

    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (deletedProduct) {
      res.status(200).json({ message: 'Товар успішно видалено.' });
    } else {
      res.status(404).json({ message: 'Не вдалося видалити товар.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};

// export const deleteMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const id: string = req.params.id;
//   const deletedMovie: Movie | null = await movieModel.findByIdAndDelete(id);
//   if (deletedMovie) {
//     res.status(200).json({ message: 'Movie deleted successfully' });
//   } else {
//     next(new HttpError(apiErrors.NOT_FOUND, 404));
//   }
// };

// export const createMovie = async (req: Request, res: Response): Promise<void> => {
//   const { title, description, releaseDate, genre } = req.body;
//   const movie = new movieModel({ title, description, releaseDate, genre: [...genre] });
//   const savedMovie: Movie | null = await movie.save();
//   const cleanedResponse: Movie = {
//     title: savedMovie.title,
//     description: savedMovie.description,
//     releaseDate: savedMovie.releaseDate,
//     genre: savedMovie.genre
//   };
//   res.status(201).json(cleanedResponse);
// };

// export const updateMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const { title, description, releaseDate, genre } = req.body;
// const updatedMovie: Movie | null = await movieModel.findOneAndUpdate(
//   { _id: req.params.id },
//   {
//     $set: {
//       title,
//       description,
//       releaseDate,
//       genre
//     }
//   },
//   { new: true, fields: { _id: 0, __v: 0 } }
// );

//   if (updatedMovie) {
//     res.json(updatedMovie);
//   } else {
//     next(new HttpError(apiErrors.NOT_FOUND, 404));
//   }
// };

// export const getMovieByGenre = async (req: Request, res: Response): Promise<void> => {
//   const genreName: string = req.params.genreName;
//   const movies: Movie[] = await movieModel.find({ genre: { $in: [genreName] } }, { _id: 0, __v: 0, updatedAt: 0 });
//   res.json(movies);
// };
