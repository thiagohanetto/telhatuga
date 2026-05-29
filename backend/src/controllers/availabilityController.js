import prisma from "../prisma/client.js";

export async function createAvailability(req, res) {

  try {

    const {
      tileType,
      quantityAvailable,
      city,
      district,
      imageUrl
    } = req.body;

    const parsedQuantity =
        Number(quantityAvailable);

    if (
        isNaN(parsedQuantity) ||
        parsedQuantity <= 0
    ) {
        return res.status(400).json({
            error: "Quantidade inválida"
        });
    }

    if (
      !tileType ||
      !quantityAvailable ||
      !city ||
      !district
    ) {
      return res.status(400).json({
        error: "Preencha todos os campos obrigatórios"
      });
    }

    const availability = await prisma.availability.create({
      data: {
        tileType,
        quantityAvailable: Number(quantityAvailable),
        city,
        district,
        imageUrl,
        userId: req.userId
      }
    });

    return res.status(201).json({
      message: "Disponibilidade criada com sucesso",
      availability
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}

export async function getAllAvailabilities(req, res) {

  try {

    const availabilities = await prisma.availability.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            city: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json(availabilities);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}

export async function getMyAvailabilities(req, res) {

  try {

    const availabilities = await prisma.availability.findMany({
      where: {
        userId: req.userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json(availabilities);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}