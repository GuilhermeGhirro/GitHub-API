export function modal_erro(mensagem) {
    Swal.fire({
        title: "Oops...",
        text: mensagem,
        icon: "error",
    });
}

export function modal_sucesso(mensagem) {
    Swal.fire({
        title: "Sucesso!",
        text: mensagem,
        icon: "success",
        FontFace: "Arial Narrow",
    });
}

export function modal_atencao(mensagem) {
    Swal.fire({
        title: "Atenção!",
        text: mensagem,
        icon: "warning",
        FontFace: "Arial",
    });
}