import prisma from "../prisma/client.js";

export async function createNeed(req, res) {

  try {

    const {
      tileType,
      quantityNeeded,
      city,
      district,
      imageUrl
    } = req.body;

    const parsedQuantity =
        Number(quantityNeeded);

    if (
        isNaN(parsedQuantity) ||
        parsedQuantity <= 0
    ) {
        return res.status(400).json({
            error: "Quantidade necessária inválida"
        });
    }

    if (
      !tileType ||
      !quantityNeeded ||
      !city ||
      !district
    ) {
      return res.status(400).json({
        error: "Preencha todos os campos obrigatórios"
      });
    }

    const need = await prisma.need.create({
      data: {
        tileType,
        quantityNeeded: Number(quantityNeeded),
        city,
        district,
        imageUrl,
        userId: req.userId
      }
    });

    return res.status(201).json({
      message: "Necessidade criada com sucesso",
      need
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}

export async function getAllNeeds(req, res) {

  try {

    const needs = await prisma.need.findMany({
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

    return res.json(needs);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}

export async function getMyNeeds(req, res) {

  try {

    const needs = await prisma.need.findMany({
      where: {
        userId: req.userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json(needs);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}

export async function getNeedMatches(
  req,
  res
) {

  try {

    const { id } = req.params;

    const need =
      await prisma.need.findUnique({
        where: { id }
      });

    if (!need) {

      return res.status(404).json({
        error: "Necessidade não encontrada"
      });

    }

    const remainingNeed =
      need.quantityNeeded -
      need.quantityReceived;

    if (remainingNeed <= 0) {

      return res.json({
        need,
        matches: []
      });

    }

    const matches =
      await prisma.availability.findMany({
        where: {
          tileType: need.tileType,

//          status: "ACTIVE",

          quantityAvailable: {
            gt: 0
          }
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              phone: true
            }
          }
        }
      });

    return res.json({
      need,
      matches
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}