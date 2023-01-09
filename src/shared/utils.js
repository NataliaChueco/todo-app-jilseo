import { useRouter } from 'vue-router';

const router = useRouter();

export function navigateTo(page, router){
    router.push({  path: `/${page}` });
}

export function showToast(message, type) {
    // Create the toast element
    const previousToast =  document.querySelector('.toast');
    if(previousToast){
        previousToast.remove();
    }
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `
        <div class="toast-header">
        <strong class="mr-auto">Error</strong>
        </div>
        <div class="toast-body">
        ${message}
        </div>
    `;
    toast.style.zIndex = 10;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '2%';
    toast.style.display = 'block';
    toast.style.margin = '10px';
    // Add the appropriate class for the toast type
    toast.classList.add(`bg-${type}`);

    // Append the toast to the body and show it
    document.body.appendChild(toast);
    $('.toast').toast({
        delay: 5000
    });
    $('.toast').toast('show');

}

  