import { modal_erro, modal_atencao} from "./modais.js";
import getMensagens from "./mensagens.js";

function GetUser() {
    if (document.getElementById("input").value === "") {
        return modal_atencao(getMensagens().mensagem.preencher_usuario);
    }
    const username = document.getElementById('input').value;
    if (!username) {
        return modal_atencao(getMensagens().mensagem.preencher_usuario);
    }
    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                modal_erro(getMensagens().mensagem.usuario_erro);
                Clear();
                return;
            }            
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#E40303', '#FF8C00', '#FFED00', '#008026', '#24408E', '#732982'],
                disableForReducedMotion: true
            });
            return response.json();
        })
        .then(data => {
            if (!data) return;
            document.getElementById("clear").style.display = "block";
            document.getElementById("avatar").src = data.avatar_url;
            document.getElementById("avatar").style.display = "block";
            document.getElementById("login").textContent = `@ ${data.login || 'Não disponível'}`;
            document.getElementById("followers_url").textContent = `${data.followers || 'Não disponível'} Followes`;
            document.getElementById("following_url").textContent = `${data.following || 'Não disponível'} Following`;
            document.getElementById("username").textContent = `${data.name || 'Não disponível'}`;
            document.getElementById("location").textContent = `${data.location || 'Não disponível'}`;
            document.querySelector(".menu-panel").style.minHeight = "300px";
            const repoPanel = document.querySelector(".menu-panel-repo");
            if (repoPanel) {
                repoPanel.style.display = "flex"; 
            }
            GetRepos(username);
        })
        .catch(error => console.log(error));
}

function GetRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
        .then(response => response.json())
        .then(repos => {
            const reposContainer = document.getElementById("repos");
            reposContainer.innerHTML = ""; 
            if (repos.length === 0) {
                modal_erro(getMensagens().mensagem.repo_not_found);     
                return;
            }

            repos.forEach(repo => {
                const repoItem = document.createElement("div");
                repoItem.classList.add("repo-item");

                repoItem.innerHTML = `
                    <div class="repo-info" >
                        <h3>${repo.name}</h3>
                        <p>${repo.description || "Sem descrição"}</p>
                        <div class="repo-details">
                            <span>🌟 ${repo.stargazers_count}</span>
                            <span>🍴 ${repo.forks_count}</span>
                            <span>🖥️ ${repo.language || "Desconhecido"}</span>
                        </div>
                        <a href="${repo.html_url}" target="_blank">🔗 Ver Repositório</a>
                    </div>
                `;

                reposContainer.appendChild(repoItem);
            });
        })
        .catch(error => console.log(error));
}

function Clear() {
    document.getElementById("clear").style.display = "none";
    document.getElementById("input").value = "";
    document.querySelector(".menu-panel").style.minHeight = "300px";

    const repoPanel = document.querySelector(".menu-panel-repo");
    if (repoPanel) {
        repoPanel.style.display = "none";
    }

    enable_disable_clear();
}
function enable_disable_clear() {
    const input = document.getElementById("input").value;
    const clearBtn = document.getElementById("clearBtn");
    if (input.length > 0) {
        clearBtn.disabled = false;
    } else {
        clearBtn.disabled = true;
    }
}

document.getElementById("input").addEventListener("input", enable_disable_clear);
document.getElementById("searchBtn").addEventListener("click", GetUser);
document.getElementById("clearBtn").addEventListener("click", Clear);
