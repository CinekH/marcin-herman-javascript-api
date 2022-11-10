import Product from "../models/product.model.js";

export const getProductsList = async (req, res) => {
  try {
    const products = await Product.find();
    if (products === null) {
      res.status(404).json({ message: "Products did not find." });
      return;
    }

    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Bad format of ID." });
      return;
    }
    const product = await Product.findById(req.params.id);
    if (product === null) {
      res.status(404).json({ message: "Product did not find." });
      return;
    }
    res.status(200).json({ product: product });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (!req.body?.id) {
      res
        .status(400)
        .json({ message: "There is no ID of product in request." });
      return;
    }

    if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Bad format of ID." });
      return;
    }

    const product = await Product.findById(req.body.id);

    if (product === null) {
      res.status(404).json({ message: "There is no product with this ID" });
      return;
    }

    if (!req.body?.name && !req.body?.price) {
      res.status(400).json({ message: "There is no data to update" });
      return;
    }

    let newName = nameValidation(req.body.name);
    let newPrice = priceValidation(req.body.price);

    product.name = newName === null ? product.name : newName;
    product.price = newPrice === null ? product.price : newPrice;
    product.updateDate = Date.now();

    await product.save();

    res.status(200).json({ message: "Product successfully updated." });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProduct = async (req, res) => {
  try {
    if (!req.body?.price || !req.body?.name) {
      res.status(400).json({ message: "No required product data" });
      return;
    }
    const price = priceValidation(req.body.price);
    const name = nameValidation(req.body.name);

    const product = new Product({ price: price, name: name });
    await product.save();
    res.status(200).json({ message: "Product successfully created." });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (!req.params.id) {
      res
        .status(400)
        .json({ message: "There is no ID of product in request." });
      return;
    }

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Bad format of ID." });
      return;
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (product === null) {
      res.status(404).json({ message: "Product did not find." });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json(error);
  }
};

const nameValidation = (name) => {
  if (
    !(
      typeof name === "string" &&
      Object.prototype.toString.call(name) === "[object String]"
    )
  )
    return null;
  if (name.length > 100) return null;
  return name;
};

const priceValidation = (price) => {
  const validatedPrice = parseFloat(price);
  if (typeof validatedPrice !== "number" || isNaN(validatedPrice)) return null;
  return validatedPrice;
};
