import prisma from "../prisma/client.js";

export async function createDonationRequest(req, res) {

  try {

    const {
      availabilityId,
      needId,
      requestedQuantity
    } = req.body;

    if (requestedQuantity <= 0) {
        return res.status(400).json({
            error: "Quantidade inválida"
        });
    }

    const availability =
      await prisma.availability.findUnique({
        where: {
          id: availabilityId
        }
      });

    if (!availability) {
        return res.status(404).json({
            error: "Disponibilidade não encontrada"
        });
    }

    if (availability.userId === req.userId) {
    return res.status(400).json({
        error: "Você não pode solicitar sua própria doação"
    });
    }

    const availableStock =
      availability.quantityAvailable -
      availability.quantityReserved;

    if (requestedQuantity > availableStock) {
      return res.status(400).json({
        error: "Quantidade indisponível"
      });
    }

    const need = await prisma.need.findUnique({
      where: {
        id: needId
      }
    });

    const remainingNeed =
      need.quantityNeeded -
      need.quantityReceived;

    if (
      requestedQuantity > remainingNeed
    ) {

      return res.status(400).json({
        error:
          "Quantidade maior que a necessidade restante"
      });

    }

    if (!need) {
      return res.status(404).json({
        error: "Necessidade não encontrada"
      });
    }

    const donationRequest =
      await prisma.donationRequest.create({
        data: {
          availabilityId,
          needId,

          donorId: availability.userId,
          receiverId: req.userId,

          requestedQuantity
        }
      });

    return res.status(201).json({
      message: "Solicitação criada",
      donationRequest
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}

export async function approveDonationRequest(
  req,
  res
) {

  try {

    const { id } = req.params;

    const donation =
      await prisma.donationRequest.findUnique({
        where: {
          id
        },
        include: {
          availability: true,
          need: true
        }
      });

    if (!donation) {

      return res.status(404).json({
        error: "Solicitação não encontrada"
      });

    }

    if (
      donation.donorId !== req.userId
    ) {

      return res.status(403).json({
        error: "Sem permissão"
      });

    }

    /*
      Verifica estoque REAL
    */
    const availableNow =
      donation.availability.quantityAvailable;

    if (
      donation.requestedQuantity >
      availableNow
    ) {

      return res.status(400).json({
        error: "Estoque insuficiente"
      });

    }

    /*
      Remove estoque
    */
    await prisma.availability.update({
      where: {
        id: donation.availability.id
      },
      data: {
        quantityAvailable: {
          decrement:
            donation.requestedQuantity
        }
      }
    });

    /*
      Atualiza recebimento
    */
    await prisma.need.update({
      where: {
        id: donation.need.id
      },
      data: {
        quantityReceived: {
          increment:
            donation.requestedQuantity
        }
      }
    });

    /*
      Conclui diretamente
    */
    const updatedDonation =
      await prisma.donationRequest.update({
        where: {
          id
        },
        data: {
          approvedQuantity:
            donation.requestedQuantity,

          status: "COMPLETED"
        }
      });

    return res.json({
      message:
        "Doação concluída com sucesso",

      donation: updatedDonation
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}

export async function completeDonation(req, res) {

  try {

    const { id } = req.params;

    const donation =
      await prisma.donationRequest.findUnique({
        where: {
          id
        },
        include: {
          availability: true,
          need: true
        }
      });

    if (!donation) {
      return res.status(404).json({
        error: "Doação não encontrada"
      });
    }

    if (donation.status !== "APPROVED") {
        return res.status(400).json({
            error: "Doação não pode ser concluída"
        });
    }

    if (
      donation.donorId !== req.userId
    ) {
      return res.status(403).json({
        error: "Sem permissão"
      });
    }

    await prisma.availability.update({
      where: {
        id: donation.availability.id
      },
      data: {
        quantityAvailable: {
          decrement: donation.approvedQuantity
        },
        quantityReserved: {
          decrement: donation.approvedQuantity
        }
      }
    });

    await prisma.need.update({
      where: {
        id: donation.need.id
      },
      data: {
        quantityReceived: {
          increment: donation.approvedQuantity
        }
      }
    });

    const updatedNeed =
    await prisma.need.findUnique({
        where: {
        id: donation.need.id
        }
    });

    if (
    updatedNeed.quantityReceived >=
    updatedNeed.quantityNeeded
    ) {

    await prisma.need.update({
        where: {
        id: updatedNeed.id
        },
        data: {
        status: "COMPLETED"
        }
    });

    } else {

    await prisma.need.update({
        where: {
        id: updatedNeed.id
        },
        data: {
        status: "PARTIAL"
        }
    });
    }

    const updatedAvailability =
    await prisma.availability.findUnique({
        where: {
        id: donation.availability.id
        }
    });

    if (
    updatedAvailability.quantityAvailable <= 0
    ) {

    await prisma.availability.update({
        where: {
        id: updatedAvailability.id
        },
        data: {
        status: "COMPLETED"
        }
    });

    } else {

    await prisma.availability.update({
        where: {
        id: updatedAvailability.id
        },
        data: {
        status: "PARTIAL"
        }
    });

    }

    const updatedDonation =
      await prisma.donationRequest.update({
        where: {
          id
        },
        data: {
          status: "COMPLETED"
        }
      });

    return res.json({
      message: "Doação concluída",
      donation: updatedDonation
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}

export async function getReceivedRequests(
  req,
  res
) {

  try {

    const requests =
      await prisma.donationRequest.findMany({
        where: {
          donorId: req.userId
        },
        include: {
          receiver: true,
          availability: true
        },
        orderBy: {
          createdAt: "desc"
        }
      });

    return res.json(requests);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}

export async function getMyRequests(
  req,
  res
) {

  try {

    const requests =
      await prisma.donationRequest.findMany({
        where: {
          receiverId: req.userId
        },

        include: {
          donor: {
            select: {
              name: true,
              phone: true
            }
          },

          availability: true
        },

        orderBy: {
          createdAt: "desc"
        }
      });

    return res.json(requests);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro interno"
    });

  }
}